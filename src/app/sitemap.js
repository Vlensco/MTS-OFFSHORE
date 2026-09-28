import { PROJECTS } from '../data/projectsData';
import { getAllProjects } from '../lib/db';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mtsoffshore.com';

export default async function sitemap() {
  // Fetch dynamic projects from DB with fallback to static projects
  let projects = PROJECTS;
  try {
    const dbProjects = await getAllProjects();
    if (dbProjects && dbProjects.length > 0) {
      projects = dbProjects;
    }
  } catch (err) {
    console.warn('Sitemap fallback to static projects:', err.message);
  }

  // Core static routes with priority and change frequencies
  const staticRoutes = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/single-point-mooring-systems`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services/pmc`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services/transport-installation`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services/asset-integrity`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/our-advantage`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/project`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Dynamic project routes
  const projectRoutes = projects.map((p) => ({
    url: `${BASE_URL}/project/${p.slug}`,
    lastModified: p.created_at ? new Date(p.created_at) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  return [...staticRoutes, ...projectRoutes];
}
