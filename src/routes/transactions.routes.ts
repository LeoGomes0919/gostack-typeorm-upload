import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';
import uploadConfig from '../config/upload';

const upload = multer(uploadConfig);
const transactionsRouter = Router();

transactionsRouter.get('/', async (req, res) => {
  const transactionRepository = getCustomRepository(TransactionsRepository);
  const transactions = await transactionRepository.find();
  const balance = await transactionRepository.getBalance();

  return res.json({ transactions, balance });
});

transactionsRouter.post('/', async (req, res) => {
  const { title, type, value, category } = req.body;
  const transactionService = new CreateTransactionService();

  const transaction = await transactionService.execute({
    title,
    type,
    value,
    category,
  });

  return res.json(transaction);
});

transactionsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleteTransactionService = new DeleteTransactionService();
  await deleteTransactionService.execute({
    id,
  });
  return res.status(204).json();
});

transactionsRouter.post('/import', upload.single('file'), async (req, res) => {
  const importTransactionService = new ImportTransactionsService();

  const transaction = await importTransactionService.execute(req.file.path);

  return res.json(transaction);
});

export default transactionsRouter;
