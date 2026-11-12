DELETE FROM "Project"
WHERE "liveUrl" IN (
  'https://ai-content-generator-demo.vercel.app',
  'https://ecommerce-store-demo.vercel.app',
  'https://kanban-collaborate-demo.vercel.app',
  'https://crypto-fintech-demo.vercel.app',
  'https://dev-hub-community.vercel.app',
  'https://cloud-health-demo.vercel.app'
);

INSERT INTO "Project" ("id", "title", "description", "tech", "imageUrl", "githubUrl", "liveUrl")
SELECT 'featured-team-workflow', 'Team Workflow Platform', 'A shared workspace for coordinating team projects, organizing work, and keeping progress visible in one place.', '', '/images/projects/team-workflow.svg', '', 'https://team-workflow-platform-sslh.vercel.app/'
WHERE NOT EXISTS (SELECT 1 FROM "Project" WHERE "liveUrl" = 'https://team-workflow-platform-sslh.vercel.app/');

INSERT INTO "Project" ("id", "title", "description", "tech", "imageUrl", "githubUrl", "liveUrl")
SELECT 'featured-injibara-university', 'Injibara University Management System', 'A university platform designed to bring academic administration and student services into one organized digital experience.', '', '/images/projects/injibara-university.svg', '', 'https://injibara-university-management-syst-omega.vercel.app/'
WHERE NOT EXISTS (SELECT 1 FROM "Project" WHERE "liveUrl" = 'https://injibara-university-management-syst-omega.vercel.app/');

INSERT INTO "Project" ("id", "title", "description", "tech", "imageUrl", "githubUrl", "liveUrl")
SELECT 'featured-ethiocare', 'EthioCare Health Platform', 'A digital health-services experience that helps people find care information and connect with relevant services.', '', '/images/projects/ethio-care.svg', '', 'https://ethio-care-platform-mpcj.vercel.app/'
WHERE NOT EXISTS (SELECT 1 FROM "Project" WHERE "liveUrl" = 'https://ethio-care-platform-mpcj.vercel.app/');

INSERT INTO "Project" ("id", "title", "description", "tech", "imageUrl", "githubUrl", "liveUrl")
SELECT 'featured-learning-management', 'Learning Management System', 'An online learning platform for organizing courses and learning resources in a clear, accessible space for learners.', '', '/images/projects/learning-management.svg', '', 'https://learning-management-system-yhr4.vercel.app/'
WHERE NOT EXISTS (SELECT 1 FROM "Project" WHERE "liveUrl" = 'https://learning-management-system-yhr4.vercel.app/');
