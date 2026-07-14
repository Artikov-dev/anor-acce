import { Badge, Card, Group, Image, Text } from '@mantine/core'
import { Link } from 'react-router'
import type { IProduct } from '../../types/product.ts'

export const ProductCard = ({ product }: { product: IProduct }) => (
  <Card
    component={Link}
    to={`/product/${product.id}`}
    shadow="sm"
    padding="lg"
    radius="md"
    withBorder
    style={{ textDecoration: 'none' }}
  >
    <Card.Section>
      <Image
        src={product.images?.[0]}
        h={180}
        alt={product.title}
        fallbackSrc="https://placehold.co/600x400?text=No+image"
      />
    </Card.Section>

    <Group justify="space-between" mt="md">
      <Text fw={600} lineClamp={1}>
        {product.title}
      </Text>
      <Badge color="orange">${product.price}</Badge>
    </Group>

    <Text size="sm" c="dimmed" lineClamp={2} mt="xs">
      {product.description}
    </Text>
  </Card>
)
