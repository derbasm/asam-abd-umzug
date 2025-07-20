const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function recreateAdmin() {
  const prisma = new PrismaClient();
  
  try {
    // Delete existing admin
    await prisma.adminUser.deleteMany({
      where: { username: 'admin' }
    });
    
    console.log('🗑️ Existing admin deleted');
    
    // Create new admin
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    const admin = await prisma.adminUser.create({
      data: {
        username: 'admin',
        passwordHash: hashedPassword
      }
    });
    
    console.log('✅ New admin created:', admin.username);
    console.log('🔐 Password: admin123');
    
    // Test the password immediately
    const isValid = await bcrypt.compare('admin123', admin.passwordHash);
    console.log('✅ Password test:', isValid ? 'PASS' : 'FAIL');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

recreateAdmin();
