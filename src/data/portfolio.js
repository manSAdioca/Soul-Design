import p1 from '@/assets/portfolio/p1.webp';
import p2 from '@/assets/portfolio/p2.webp';
import p3 from '@/assets/portfolio/p3.webp';
import p4 from '@/assets/portfolio/p4.webp';
import p5 from '@/assets/portfolio/p5.webp';
import p6 from '@/assets/portfolio/p6.webp';
import p7 from '@/assets/portfolio/p7.webp';
import p8 from '@/assets/portfolio/p8.webp';
import p9 from '@/assets/portfolio/p9.webp';

export const projects = [
  { id: 1, desktop: p1, name: "Projeto 1" },
  { id: 2, desktop: p2, name: "Projeto 2" },
  { id: 3, desktop: p3, name: "Projeto 3" },
  { id: 4, desktop: p4, name: "Projeto 4" },
  { id: 5, desktop: p5, name: "Projeto 5" },
  { id: 6, desktop: p6, name: "Projeto 6" },
  { id: 7, desktop: p7, name: "Projeto 7" },
  { id: 8, desktop: p8, name: "Projeto 8" },
  { id: 9, desktop: p9, name: "Projeto 9" }
];

export const getProjects = (niche) => {
  if (niche === 'distribuidoras') {
    return [
      { id: 'd1', desktop: '/assets/distribuidora-catalogo.png', name: "Catálogo B2B e B2C Imperatriz" },
      { id: 'd2', desktop: '/assets/distribuidora-dashboard.png', name: "Dashboard de Gestão e Operações" }
    ];
  }
  if (niche === 'corretores') {
    return [
      { id: 'c1', desktop: p2, name: "Site Institucional Alto Padrão" },
      { id: 'c2', desktop: p9, name: "Landing Page de Lançamento" }
    ];
  }
  return projects;
};
