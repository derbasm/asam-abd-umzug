const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function createAdmin() {
  const prisma = new PrismaClient();
  
  try {
    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD || 'admin123';
    
    // Check if admin already exists
    const existingAdmin = await prisma.adminUser.findUnique({
      where: { username }
    });
    
    if (existingAdmin) {
      console.log('✅ Admin Benutzer existiert bereits');
      console.log('   Benutzername:', username);
      return;
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create admin user
    await prisma.adminUser.create({
      data: {
        username,
        passwordHash: hashedPassword
      }
    });
    
    console.log('✅ Admin Benutzer erfolgreich erstellt:');
    console.log('   Benutzername:', username);
    console.log('   Passwort:', password);
    console.log('   ⚠️  Bitte ändern Sie das Passwort in der Produktion!');
    
  } catch (error) {
    console.error('❌ Fehler beim Erstellen des Admin Benutzers:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
