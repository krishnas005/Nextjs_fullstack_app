import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

connect();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'User does not exist' }, { status: 400 });
    }

    const validPassword = await bcryptjs.compare(password,user.password);

    if(!validPassword) {
      return NextResponse.json({message: "Invalid Password "},{status:400})
    }

    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    const tokenSecret = process.env.TOKEN_SECRET || 'defaultSecretKey';

    const token = await jwt.sign(tokenData, tokenSecret, { expiresIn: '1h' });

    const response = NextResponse.json({
      message: 'Login successful',
      success: true,
    });
    response.cookies.set('token', token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
