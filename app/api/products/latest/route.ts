import clientPromise from '@/lib/mongodb';
import { mongooseConnect } from '@/lib/mongoose';
import { Models } from '@/models/models';
import {
  MongooseFile,
  MongooseProduct,
  MongooseProductPopulated,
  Product as ProductType,
} from '@/types/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  await mongooseConnect();
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get('limit');
  try {
    const products: MongooseProductPopulated[] = await Models.Product.find({}, null, {
      sort: { _id: -1 },
      limit: limit ? +limit : undefined,
    }).populate(['images', 'category']);
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Ошибка: не удалось получить продукты' }, { status: 400 });
  }
}
