import { mongooseConnect } from '@/lib/mongoose';
import { Models } from '@/models/models';
import { Category, MongooseCategory, MongooseCategoryPopulated } from '@/types/types';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { checkAuth, checkAuthV2 } from '../auth/[...nextauth]/route';

export async function GET(req: NextRequest) {
  await mongooseConnect();
  try {
    await checkAuth();
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ message: error }, { status: 400 });
    }
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (id) {
    try {
      const category = await Models.Category.findById(id).populate(['parent']);
      if (!category)
        return NextResponse.json('Такой категории не существует в базе', { status: 400 });
      return NextResponse.json(category, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: 'Ошибка: не получилось получить категорию' },
        { status: 400 },
      );
    }
  } else {
    try {
      const categories: MongooseCategoryPopulated[] = await Models.Category.find().populate([
        'parent',
      ]);
      return NextResponse.json(categories, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: 'Ошибка: не получилось получить категории' },
        { status: 400 },
      );
    }
  }
}
