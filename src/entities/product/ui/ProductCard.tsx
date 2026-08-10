import React from 'react'
import { Badge, Card, Group, Image, Text, Button, Stack } from '@mantine/core'
import { Link } from 'react-router'
import { IconShoppingCart } from '@tabler/icons-react'
import type { IProduct } from '../model/types'

export interface ProductCardProps {
  product: IProduct
  isAdmin?: boolean
  onAddToCart?: (product: IProduct) => void
  onEdit?: (product: IProduct) => void
  onDelete?: (product: IProduct) => void
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isAdmin,
  onAddToCart,
  onEdit,
  onDelete,
}) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (onAddToCart) {
      onAddToCart(product)
    }
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (onEdit) {
      onEdit(product)
    }
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (onDelete) {
      onDelete(product)
    }
  }

  return (
    <Card
      shadow="md"
      padding="lg"
      radius="xl"
      style={{
        border: '1px solid #e9ecef',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <Stack gap="md" style={{ flex: 1 }}>
        <Card.Section pos="relative">
          <Link to={`/product/${product.id}`}>
            <Image
              src={product.images?.[0]}
              h={220}
              alt={product.title}
              fallbackSrc="https://placehold.co/600x400?text=Rasm+yo'q"
              style={{ objectFit: 'cover' }}
            />
          </Link>
          <Badge
            color="anor"
            variant="filled"
            size="xl"
            radius="md"
            pos="absolute"
            bottom={16}
            left={16}
            style={{
              fontWeight: 800,
              boxShadow: '0 4px 12px rgba(217,0,8,0.4)',
              letterSpacing: '0.5px',
            }}
          >
            ${product.price}
          </Badge>
          {isAdmin && (
            <Group gap="xs" pos="absolute" top={12} right={12}>
              {onEdit && (
                <Button
                  color="anor"
                  variant="white"
                  radius="xl"
                  size="xs"
                  onClick={handleEdit}
                  style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                >
                  Tahrirlash
                </Button>
              )}
              {onDelete && (
                <Button
                  color="red"
                  variant="white"
                  radius="xl"
                  size="xs"
                  onClick={handleDelete}
                  style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                >
                  O'chirish
                </Button>
              )}
            </Group>
          )}
        </Card.Section>

        <Group justify="space-between" align="flex-start">
          <Text
            component={Link}
            to={`/product/${product.id}`}
            fw={800}
            size="lg"
            lineClamp={2}
            style={{
              flex: 1,
              lineHeight: 1.3,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {product.title}
          </Text>
        </Group>

        <Text size="sm" c="dimmed" lineClamp={2}>
          {product.description}
        </Text>
      </Stack>

      <Group gap="xs" mt="lg">
        <Button
          component={Link}
          to={`/product/${product.id}`}
          variant="default"
          radius="md"
          style={{ flex: 1 }}
          size="sm"
        >
          Batafsil
        </Button>
        {onAddToCart && (
          <Button
            color="red"
            radius="md"
            onClick={handleAddToCart}
            style={{ flex: 1 }}
            size="sm"
            leftSection={<IconShoppingCart size={16} />}
          >
            Savatga
          </Button>
        )}
      </Group>
    </Card>
  )
}
