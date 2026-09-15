const verificarToken = require('../src/middlewares/verificarToken');

describe('Suite: Middleware verificarToken', () => {

  test('Debe bloquear si no hay Token', () => {
    const req = { headers: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    verificarToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  test('Debe bloquear si el token es invÃ¡lido', () => {
    const req = { headers: { authorization: 'Bearer token-invalido' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    verificarToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

});