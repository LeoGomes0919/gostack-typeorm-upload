import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionRepository = getRepository(Transaction);

    const findTransaction = await transactionRepository.findOne(id);
    if (!findTransaction) {
      throw new AppError('Transação não encontrada.', 404);
    }

    await transactionRepository.delete(findTransaction.id);
  }
}

export default DeleteTransactionService;
