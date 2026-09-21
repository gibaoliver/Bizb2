export interface Ad {
  id: string;
  title: string;
  price: number;
  currency: string;
  category: string;
  location: string;
  postedAt: string;
  isFeatured: boolean;
  image: string;
  description: string;
  gallery: string[];
  seller: {
    name: string;
    phone: string;
    memberSince: string;
  };
  features: Record<string, string>;
}

export const ads: Ad[] = [
  {
    id: "1",
    title: "Smartphone Pro Max 256GB - Estado de Novo",
    price: 4899,
    currency: "R$",
    category: "Eletrônicos",
    location: "São Paulo, SP",
    postedAt: "Há 2 horas",
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop",
    description: "Aparelho impecável, sem marcas de uso. Bateria em 98%. Acompanha caixa original, carregador e capinha de brinde. Não aceito trocas, apenas venda.",
    gallery: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592899677974-d464f27dbdc0?q=80&w=800&auto=format&fit=crop"
    ],
    seller: {
      name: "João Silva",
      phone: "+55 11 98765-4321",
      memberSince: "Jan 2023"
    },
    features: {
      "Marca": "Apple",
      "Modelo": "Pro Max",
      "Armazenamento": "256GB",
      "Condição": "Usado - Como novo"
    }
  },
  {
    id: "2",
    title: "Honda Civic EXL 2021 Único Dono",
    price: 115000,
    currency: "R$",
    category: "Veículos",
    location: "Campinas, SP",
    postedAt: "Há 5 horas",
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop",
    description: "Carro de garagem, todas as revisões feitas na concessionária. Manual e chave reserva. IPVA 2024 pago. Pneus novos.",
    gallery: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800&auto=format&fit=crop"
    ],
    seller: {
      name: "Carlos Mendes",
      phone: "+55 19 99999-1111",
      memberSince: "Fev 2021"
    },
    features: {
      "Ano": "2021",
      "Quilometragem": "32.000 km",
      "Câmbio": "Automático",
      "Combustível": "Flex"
    }
  },
  {
    id: "3",
    title: "Apartamento 3 Quartos Centro - Vista Mar",
    price: 850000,
    currency: "R$",
    category: "Imóveis",
    location: "Rio de Janeiro, RJ",
    postedAt: "Há 1 dia",
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop",
    description: "Lindo apartamento com 3 quartos, sendo 1 suíte. Varanda gourmet, 2 vagas de garagem. Condomínio com infraestrutura completa: piscina, academia e salão de festas.",
    gallery: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1de2d1d49e?q=80&w=800&auto=format&fit=crop"
    ],
    seller: {
      name: "Imobiliária Litoral",
      phone: "+55 21 3333-4444",
      memberSince: "Mar 2020"
    },
    features: {
      "Área Útil": "120m²",
      "Quartos": "3",
      "Banheiros": "2",
      "Vagas": "2"
    }
  },
  {
    id: "4",
    title: "Mesa de Jantar Madeira Maciça 6 Lugares",
    price: 1200,
    currency: "R$",
    category: "Móveis",
    location: "Curitiba, PR",
    postedAt: "Há 2 dias",
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1617806118233-18e1c12d40d7?q=80&w=800&auto=format&fit=crop",
    description: "Mesa rústica em excelente estado. Madeira maciça, acompanha 6 cadeiras estofadas. Retirada por conta do comprador no bairro Batel.",
    gallery: [
      "https://images.unsplash.com/photo-1617806118233-18e1c12d40d7?q=80&w=800&auto=format&fit=crop"
    ],
    seller: {
      name: "Mariana Souza",
      phone: "+55 41 99123-4567",
      memberSince: "Out 2023"
    },
    features: {
      "Condição": "Usado",
      "Material": "Madeira",
      "Lugares": "6"
    }
  },
  {
    id: "5",
    title: "Notebook Gamer RTX 4060 16GB RAM",
    price: 6500,
    currency: "R$",
    category: "Eletrônicos",
    location: "Belo Horizonte, MG",
    postedAt: "Há 3 horas",
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=800&auto=format&fit=crop",
    description: "Notebook de altíssimo desempenho para jogos e edição. Pouco tempo de uso. Na garantia da fabricante até Dezembro.",
    gallery: [
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=800&auto=format&fit=crop"
    ],
    seller: {
      name: "Tech Store",
      phone: "+55 31 98888-0000",
      memberSince: "Ago 2022"
    },
    features: {
      "Processador": "Intel Core i7",
      "RAM": "16GB",
      "Armazenamento": "1TB SSD",
      "Placa de Vídeo": "RTX 4060"
    }
  },
  {
    id: "6",
    title: "Bicicleta Mountain Bike Aro 29 Shimano",
    price: 1800,
    currency: "R$",
    category: "Esportes",
    location: "Florianópolis, SC",
    postedAt: "Há 4 dias",
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800&auto=format&fit=crop",
    description: "Bicicleta perfeita para trilhas. Câmbio Shimano 21 marchas, freio a disco, suspensão dianteira. Usada apenas em asfalto.",
    gallery: [
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800&auto=format&fit=crop"
    ],
    seller: {
      name: "Pedro Alves",
      phone: "+55 48 97777-6666",
      memberSince: "Nov 2023"
    },
    features: {
      "Aro": "29",
      "Marchas": "21",
      "Freio": "A Disco",
      "Condição": "Usado"
    }
  },
  {
    id: "7",
    title: "Vaga Desenvolvedor Front-end Pleno",
    price: 8000,
    currency: "R$",
    category: "Empregos",
    location: "Remoto",
    postedAt: "Há 1 semana",
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
    description: "Vaga 100% remota para Desenvolvedor React/Next.js. Benefícios: VA, VR, Plano de Saúde e Gympass. Contratação CLT.",
    gallery: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop"
    ],
    seller: {
      name: "DevTech Solutions",
      phone: "RH - contato via chat",
      memberSince: "Mai 2019"
    },
    features: {
      "Modelo": "Remoto",
      "Contrato": "CLT",
      "Nível": "Pleno",
      "Tecnologia": "React / Next.js"
    }
  },
  {
    id: "8",
    title: "Sofá Retrátil e Reclinável 3 Lugares",
    price: 1500,
    currency: "R$",
    category: "Móveis",
    location: "Porto Alegre, RS",
    postedAt: "Há 3 dias",
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop",
    description: "Sofá super confortável de suede cinza. Retrátil abrindo até 1,80m. Sem rasgos ou manchas. Motivo da venda: mudança de estado.",
    gallery: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop"
    ],
    seller: {
      name: "Fernanda Costa",
      phone: "+55 51 98888-2222",
      memberSince: "Dez 2023"
    },
    features: {
      "Cor": "Cinza",
      "Material": "Suede",
      "Tamanho": "2.20m largura"
    }
  }
];
