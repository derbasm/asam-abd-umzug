const { PrismaClient } = require('@prisma/client');

async function deleteAllAdmins() {
  const prisma = new PrismaClient();
  
  try {
    const result = await prisma.adminUser.deleteMany({});
    console.log('✅ Alle Admin-Benutzer gelöscht:', result.count);
  } catch (error) {
    console.error('❌ Fehler beim Löschen:', error);
  } finally {
    await prisma.$disconnect();
  }
}

deleteAllAdmins();
