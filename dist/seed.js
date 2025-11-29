import { connectDB, UserModel, ContentModel } from './db.js';
async function seedDemoUser() {
    try {
        await connectDB();
        // Check if demo user already exists
        const existingUser = await UserModel.findOne({ username: 'demo' });
        if (existingUser) {
            console.log('✅ Demo user already exists!');
            console.log('   Username: demo');
            console.log('   Password: demo123');
        }
        else {
            // Create demo user
            const demoUser = new UserModel({
                username: 'demo',
                password: 'demo123'
            });
            await demoUser.save();
            // Add some sample content for demo user
            const sampleContent = [
                {
                    title: 'React 19 - What\'s New',
                    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                    type: 'youtube',
                    userId: demoUser._id,
                    tags: []
                },
                {
                    title: 'JavaScript Tips & Tricks',
                    link: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
                    type: 'youtube',
                    userId: demoUser._id,
                    tags: []
                },
                {
                    title: 'Tech News Update',
                    link: 'https://twitter.com/elonmusk/status/1234567890',
                    type: 'twitter',
                    userId: demoUser._id,
                    tags: []
                },
                {
                    title: 'TailwindCSS Documentation',
                    link: 'https://tailwindcss.com/docs',
                    type: 'link',
                    userId: demoUser._id,
                    tags: []
                },
                {
                    title: 'MongoDB Best Practices',
                    link: 'https://www.mongodb.com/docs/manual/',
                    type: 'link',
                    userId: demoUser._id,
                    tags: []
                }
            ];
            await ContentModel.insertMany(sampleContent);
            console.log('🎉 Demo user created successfully!');
            console.log('   Username: demo');
            console.log('   Password: demo123');
            console.log(`   Sample content: ${sampleContent.length} items added`);
        }
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Error seeding demo user:', error);
        process.exit(1);
    }
}
seedDemoUser();
//# sourceMappingURL=seed.js.map