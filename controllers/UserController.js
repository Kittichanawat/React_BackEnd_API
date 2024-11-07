const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Middleware สำหรับตรวจสอบ Token
function checkSignIn(req, res, next) {
    try {
        const secret = process.env.TOKEN_SECRET;
        const token = req.headers['authorization'];
        const result = jwt.verify(token, secret);

        if (result) {
            req.userId = result.id; // เก็บ userId ใน req เพื่อใช้ใน route อื่น ๆ
            next();
        } else {
            res.status(401).send({ message: 'Unauthorized' });
        }
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
}

// ฟังก์ชันดึง userId จาก Token
function getUserId(req) {
    const token = req.headers['authorization'];
    const secret = process.env.TOKEN_SECRET;
    const result = jwt.verify(token, secret);
    return result.id;
}

// Middleware สำหรับอ่าน JSON จาก body
app.use(express.json());

app.post('/signIn', async (req, res) => {
    try {
        const user = await prisma.user.findFirst({
            select: {
                id: true,
                name: true
            },
            where: {
                user: req.body.user,
                pass: req.body.pass,
                status: 'use'
            }
        });

        if (user) {
            const secret = process.env.TOKEN_SECRET;
            const token = jwt.sign(user, secret, { expiresIn: '30d' });
            return res.send({ token: token });
        }

        res.status(401).send({ message: 'Unauthorized' });
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
});

app.get('/info', checkSignIn, async (req, res) => {
    try {
        const user = await prisma.user.findFirst({
            select: {
                name: true
            },
            where: {
                id: req.userId
            }
        });
        res.send({ result: user });
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
});

module.exports = app;
