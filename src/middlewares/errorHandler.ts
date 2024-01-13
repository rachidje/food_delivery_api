import { NextFunction, Request, Response } from "express";


export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);
  
    // Formater l'erreur de manière standard
    const formattedError = {
      message: err.message || 'Une erreur s\'est produite',
      code: (err as any).statusCode || 500
    };
  
    // Renvoyer une réponse JSON avec l'erreur
    res.status(formattedError.code).json({ success: false, data: null, error: formattedError });
  }