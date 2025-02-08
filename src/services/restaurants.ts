import type { Restaurant, MenuItem } from '../types';

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Svenska Köket',
    description: 'Traditionell svensk husmanskost',
    city: 'Malmö',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
    rating: 4.5,
    reviewCount: 128,
    deliveryOptions: [
      { provider: 'foodora', estimatedTime: '30-45 min', price: 49 },
      { provider: 'wolt', estimatedTime: '25-40 min', price: 45 }
    ]
  },
  {
    id: '2',
    name: 'Havets Pärlor',
    description: 'Färsk fisk och skaldjur',
    city: 'Trelleborg',
    image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62',
    rating: 4.7,
    reviewCount: 89,
    deliveryOptions: [
      { provider: 'foodora', estimatedTime: '35-50 min', price: 55 }
    ]
  },
  {
    id: '3',
    name: 'Skånska Delikatesser',
    description: 'Lokala specialiteter och skånska favoriter',
    city: 'Ystad',
    image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f',
    rating: 4.6,
    reviewCount: 156,
    deliveryOptions: [
      { provider: 'wolt', estimatedTime: '30-45 min', price: 49 }
    ]
  },
  {
    id: '4',
    name: 'Trelleborgs Steakhouse',
    description: 'Premium kött och grillrätter',
    city: 'Trelleborg',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947',
    rating: 4.4,
    reviewCount: 72,
    deliveryOptions: [
      { provider: 'foodora', estimatedTime: '40-55 min', price: 59 }
    ]
  },
  {
    id: '5',
    name: 'Ystads Fiskrökeri',
    description: 'Nyrökta delikatesser från havet',
    city: 'Ystad',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae',
    rating: 4.8,
    reviewCount: 94,
    deliveryOptions: [
      { provider: 'wolt', estimatedTime: '25-40 min', price: 45 }
    ]
  }
];

export const menuItems: Record<string, MenuItem[]> = {
  '1': [ // Svenska Köket
    {
      id: '1-1',
      restaurantId: '1',
      name: 'Köttbullar med potatismos',
      description: 'Svenska köttbullar serverade med potatismos, lingon och pressgurka',
      price: 149,
      image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468',
      category: 'Huvudrätter'
    },
    {
      id: '1-2',
      restaurantId: '1',
      name: 'Laxfilé med dillstuvad potatis',
      description: 'Grillad laxfilé med dillstuvad potatis och citron',
      price: 189,
      image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927',
      category: 'Huvudrätter'
    },
    {
      id: '1-3',
      restaurantId: '1',
      name: 'Ärtsoppa med pannkakor',
      description: 'Klassisk svensk ärtsoppa med fläsk, serveras med pannkakor och sylt',
      price: 129,
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd',
      category: 'Torsdagsspecial'
    }
  ],
  '2': [ // Havets Pärlor
    {
      id: '2-1',
      restaurantId: '2',
      name: 'Skaldjursplatå',
      description: 'Färska räkor, krabba, musslor och ostron med aioli och citron',
      price: 399,
      image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47',
      category: 'Specialiteter'
    },
    {
      id: '2-2',
      restaurantId: '2',
      name: 'Moules Marinières',
      description: 'Blåmusslor i vitvin med grädde, vitlök och persilja',
      price: 189,
      image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853',
      category: 'Huvudrätter'
    },
    {
      id: '2-3',
      restaurantId: '2',
      name: 'Fisk- och skaldjurssoppa',
      description: 'Krämig soppa med dagens fångst och skaldjur',
      price: 169,
      image: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659',
      category: 'Soppor'
    }
  ],
  '3': [ // Skånska Delikatesser
    {
      id: '3-1',
      restaurantId: '3',
      name: 'Skånsk Äggakaka',
      description: 'Traditionell äggakaka med stekt fläsk och lingon',
      price: 145,
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8',
      category: 'Traditionellt'
    },
    {
      id: '3-2',
      restaurantId: '3',
      name: 'Spättafilé',
      description: 'Panerad spättafilé med remouladsås och kokt potatis',
      price: 179,
      image: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369',
      category: 'Fisk'
    },
    {
      id: '3-3',
      restaurantId: '3',
      name: 'Skånsk Kalops',
      description: 'Långkokt nötkött i kryddstark sås med rödbetor',
      price: 169,
      image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7',
      category: 'Huvudrätter'
    }
  ],
  '4': [ // Trelleborgs Steakhouse
    {
      id: '4-1',
      restaurantId: '4',
      name: 'Ribeye Steak',
      description: 'Grillad ribeye (300g) med rödvinssås och rostad potatis',
      price: 329,
      image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e',
      category: 'Stekar'
    },
    {
      id: '4-2',
      restaurantId: '4',
      name: 'BBQ Ribs',
      description: 'Långkokta revbensspjäll med BBQ-sås och coleslaw',
      price: 249,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947',
      category: 'BBQ'
    },
    {
      id: '4-3',
      restaurantId: '4',
      name: 'Grillad Oxfilé',
      description: 'Grillad oxfilé med bearnaisesås och pommes frites',
      price: 289,
      image: 'https://images.unsplash.com/photo-1558030006-450675393462',
      category: 'Stekar'
    }
  ],
  '5': [ // Ystads Fiskrökeri
    {
      id: '5-1',
      restaurantId: '5',
      name: 'Varmrökt lax',
      description: 'Varmrökt lax med dillstuvad potatis och citron',
      price: 189,
      image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927',
      category: 'Rökt'
    },
    {
      id: '5-2',
      restaurantId: '5',
      name: 'Rökta räkor',
      description: 'Nyrökta räkor med aioli och surdegsbröd',
      price: 165,
      image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47',
      category: 'Rökt'
    },
    {
      id: '5-3',
      restaurantId: '5',
      name: 'Fiskplanka',
      description: 'Blandning av dagens rökta delikatesser med tillbehör',
      price: 245,
      image: 'https://images.unsplash.com/photo-1559847844-5315695dadae',
      category: 'Specialiteter'
    }
  ]
};