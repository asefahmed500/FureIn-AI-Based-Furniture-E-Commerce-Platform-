import prisma from './lib/prisma'


async function main() {
  try {
    const userCount = await prisma.user.count()
    const productCount = await prisma.product.count()
    const orderCount = await prisma.order.count()
    const recentOrders = await prisma.order.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' }
    })
    console.log(`Successfully connected to DB. User count: ${userCount}`)
    console.log(`Product count: ${productCount}`)
    console.log(`Order count: ${orderCount}`)
    console.log('Recent Orders:', JSON.stringify(recentOrders, null, 2))
  } catch (error) {
    console.error('Failed to connect to DB:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
