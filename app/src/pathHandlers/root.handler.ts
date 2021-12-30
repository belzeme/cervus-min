import express from 'express';

export const rootHandler: express.RequestHandler = (req, res) => {
  res.send('Hello world\n');
};
