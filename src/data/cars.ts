export interface Vehicle {
  id: string
  name: string
  type: string
  price: number
  transmission: string
  fuel: string
  ac: boolean
}

export const VEHICLES: Vehicle[] = [
  {
    id: '1',
    name: 'Mercedes',
    type: 'Sedan',
    price: 25,
    transmission: 'Automat',
    fuel: 'PB 95',
    ac: true,
  },
  {
    id: '2',
    name: 'Mercedes',
    type: 'Sport',
    price: 50,
    transmission: 'Manual',
    fuel: 'PB 95',
    ac: true,
  },
  {
    id: '3',
    name: 'Mercedes',
    type: 'Sedan',
    price: 45,
    transmission: 'Automat',
    fuel: 'PB 95',
    ac: true,
  },
  {
    id: '4',
    name: 'Porsche',
    type: 'SUV',
    price: 40,
    transmission: 'Automat',
    fuel: 'PB 95',
    ac: true,
  },
  {
    id: '5',
    name: 'Toyota',
    type: 'Sedan',
    price: 35,
    transmission: 'Manual',
    fuel: 'PB 95',
    ac: true,
  },
  {
    id: '6',
    name: 'Porsche',
    type: 'SUV',
    price: 50,
    transmission: 'Automat',
    fuel: 'PB 95',
    ac: true,
  },
  {
    id: '7',
    name: 'Mercedes',
    type: 'Van',
    price: 50,
    transmission: 'Automat',
    fuel: 'PB 95',
    ac: true,
  },
  {
    id: '8',
    name: 'Toyota',
    type: 'Sport',
    price: 60,
    transmission: 'Manual',
    fuel: 'PB 95',
    ac: true,
  },
  {
    id: '9',
    name: 'Maybach',
    type: 'Sedan',
    price: 70,
    transmission: 'Automat',
    fuel: 'PB 95',
    ac: true,
  },
]
