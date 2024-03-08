import { mongooseConnect } from '@/lib/mongoose';
import Order from '@/models/Order';
import Product from '@/models/Product';
import { Models } from '@/models/models';
import { MongooseProduct, MongooseProductPopulated, PaymentBody } from '@/types/types';
import { NextRequest, NextResponse } from 'next/server';
import { useDispatch } from 'react-redux';

export async function POST(req: NextRequest) {
  await mongooseConnect();
  const { productIds, ...rest }: PaymentBody = await req.json();
  const uniqueIds = [...Array.from(new Set(productIds))];
  const productsInfo: MongooseProduct[] = await Product.find({ _id: uniqueIds }).lean();
  const finalOrderInfo = [];
  for (const productId of uniqueIds) {
    console.log(productId);
    const info = productsInfo.find((p) => p._id.toString() === productId);
    console.log(productsInfo);
    const quantity = productIds.filter((id) => id === productId).length;
    info &&
      finalOrderInfo.push({
        quantity,
        price_data: {
          currency: 'USD',
          product_data: { name: info.name },
          unit_amount: quantity * info.price,
        },
      });
  }

  const order = await Order.create({ ...rest, paid: false, line_items: finalOrderInfo });

  return NextResponse.json(order, { status: 200 });
}
