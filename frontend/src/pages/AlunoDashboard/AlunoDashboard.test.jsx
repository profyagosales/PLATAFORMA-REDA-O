import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AlunoDashboard from './index';

describe('AlunoDashboard navigation', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ essays: [] })
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('changes sections when navigation buttons are clicked', async () => {
    const user = userEvent.setup();
    render(<AlunoDashboard />);

    expect(
      await screen.findByRole('heading', { name: /enviar redação/i })
    ).toBeInTheDocument();

    await act(async () => {
      await user.click(screen.getByRole('button', { name: /correções/i }));
    });
    expect(
      await screen.findByRole('heading', { name: /correções/i })
    ).toBeInTheDocument();

    await act(async () => {
      await user.click(screen.getByRole('button', { name: /perfil/i }));
    });
    expect(
      await screen.findByRole('heading', { name: /perfil/i })
    ).toBeInTheDocument();

    await act(async () => {
      await user.click(screen.getByRole('button', { name: /enviar redação/i }));
    });
    expect(
      await screen.findByRole('heading', { name: /enviar redação/i })
    ).toBeInTheDocument();
  });
});
