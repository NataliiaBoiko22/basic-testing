// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from './index';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 5000;
    const account = getBankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 5000;
    const account = getBankAccount(initialBalance);
    expect(() => account.withdraw(5500)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 5000;
    const account1 = getBankAccount(initialBalance);
    const account2 = getBankAccount(0);
    expect(() => account1.transfer(5500, account2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 5000;
    const account = getBankAccount(initialBalance);
    expect(() => account.transfer(100, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const initialBalance = 5000;
    const depositAmount = 1000;
    const account = getBankAccount(initialBalance);
    account.deposit(depositAmount);
    expect(account.getBalance()).toBe(initialBalance + depositAmount);
  });

  test('should withdraw money', () => {
    const initialBalance = 5000;
    const withdrawAmount = 2000;
    const account = getBankAccount(initialBalance);
    account.withdraw(withdrawAmount);
    expect(account.getBalance()).toBe(initialBalance - withdrawAmount);
  });

  test('should transfer money', () => {
    const initialBalance1 = 5000;
    const initialBalance2 = 2000;
    const transferAmount = 1500;
    const account1 = getBankAccount(initialBalance1);
    const account2 = getBankAccount(initialBalance2);
    account1.transfer(transferAmount, account2);
    expect(account1.getBalance()).toBe(initialBalance1 - transferAmount);
    expect(account2.getBalance()).toBe(initialBalance2 + transferAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const fetchBalance = jest.fn().mockResolvedValue(2);
    const account = getBankAccount(0);
    account.fetchBalance = fetchBalance;
    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const fetchBalance = jest.fn().mockResolvedValue(2);
    const account = getBankAccount(0);
    account.fetchBalance = fetchBalance;
    await account.synchronizeBalance();
    expect(account.getBalance()).toEqual(2);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(5000);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
