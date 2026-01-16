import { NextResponse } from "next/server";

export const response = (success, statusCode, message, data = {}) => {
  return NextResponse.json({
    success,
    statusCode,
    message,
    data,
  })
}

export const catchError = (error, customMessage ) => {
  // handleing duplicate key error
  if(error.code == 11000){
    const key = Object.keys(error.keyValue).join(',');
    error.message = `Duplicate field: ${key}. These field value must be unique.`;
  }
  
  let errorObj = {}

  if(process.env.NODE_ENV === 'development'){
    errorObj = {
      message: error.message,
      error
    }
  } else {
    errorObj = {
      message: customMessage || 'Internal server error.',
    }
  }
  return response(false, error.code, ...errorObj);
  
}