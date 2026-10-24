import { prisma } from '@/lib/prisma';
import HeroSection from '@/components/home/HeroSection';
import BenefitsSection from '@/components/home/BenefitsSection';
import AgeGroupsSection from '@/components/home/AgeGroupsSection';
import DayScheduleSection from '@/components/home/DayScheduleSection';
import ActivitiesSection from '@/components/home/ActivitiesSection';
import GalleryPreview from '@/components/home/GalleryPreview';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';

export default async function HomePage() {
  const [groups, activities, gallery, settings] = await Promise.all([
    prisma.group.findMany({ orderBy: { order: 'asc' } }),
    prisma.activity.findMany({ orderBy: { order: 'asc' }, take: 6 }),
    prisma.galleryImage.findMany({ orderBy: { order: 'asc' }, take: 6 }),
    prisma.settings.findUnique({ where: { id: 1 } }),
  ]);

  return (
    <>
      <HeroSection slogan={settings?.slogan || ''} />
      <BenefitsSection />
      <AgeGroupsSection groups={groups} />
      <DayScheduleSection />
      <ActivitiesSection activities={activities} />
      <GalleryPreview images={gallery} />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
