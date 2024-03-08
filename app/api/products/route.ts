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

type ResponseData = {
  message: string;
};

export async function GET(req: NextRequest) {
  await mongooseConnect();
  const { searchParams } = new URL(req.url);
  const sort = searchParams.get('sort');
  const findQueryOptions = sort ? { sort: { _id: Number(sort) } } : null;

  try {
    const products: MongooseProduct[] = await Models.Product.find(
      {},
      null,
      findQueryOptions,
    ).populate(['images', 'category']);
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Ошибка: не удалось получить продукты' }, { status: 400 });
  }
}
export async function POST(req: NextRequest) {
  await mongooseConnect();
  const body = await req.json();

  try {
    const products: MongooseProduct[] = await Models.Product.find({ _id: body }).populate([
      'images',
      'category',
    ]);
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Ошибка: не удалось получить продукты' }, { status: 400 });
  }
}
