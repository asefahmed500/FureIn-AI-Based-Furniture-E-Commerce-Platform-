import prisma from './lib/prisma'


async function main() {
  try {
    const userCount = await prisma.user.count()
    console.log(`Successfully connected to DB. User count: ${userCount}`)
    const productCount = await prisma.product.count()
    console.log(`Product count: ${productCount}`)
  } catch (error) {
    console.error('Failed to connect to DB:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
