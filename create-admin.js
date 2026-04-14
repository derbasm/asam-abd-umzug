const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function createAdmin() {
  const prisma = new PrismaClient();
  
  try {
    const username = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    
    if (!username || !password) {
      console.error('❌ ADMIN_EMAIL und ADMIN_PASSWORD müssen in der .env Datei gesetzt sein');
      return;
    }
    
    // Check if admin already exists (case-insensitive)
    const existingAdmin = await prisma.adminUser.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive'
        }
      }
    });
    
    if (existingAdmin) {
      console.log('✅ Admin Benutzer existiert bereits');
      console.log('   Benutzername:', username);
      return;
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create admin user
    const admin = await prisma.adminUser.create({
      data: {
        username: username,
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
