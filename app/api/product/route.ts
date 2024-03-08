import { mongooseConnect } from '@/lib/mongoose';
import { Models } from '@/models/models';
import { MongooseProduct, MongooseProductPopulated } from '@/types/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  await mongooseConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (id) {
    try {
      const product = await Models.Product.findById(id).populate(['images', 'category']);
      if (!product)
        return NextResponse.json('Такого продукта не существует в базе', { status: 400 });
      return NextResponse.json(product, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: 'Ошибка: Не удалось получить продукт по id' },
        { status: 400 },
      );
    }
  } else {
    try {
      const product = await Models.Product.findOne().populate(['images', 'category']);
      return NextResponse.json(product, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Ошибка: не удалось получить продукт' }, { status: 400 });
    }
  }
}
