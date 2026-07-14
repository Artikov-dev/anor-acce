import {
  Container,
  Title,
  Grid,
  Text,
  Box,
  Image,
  Button,
  Group,
  Badge,
  Loader,
  Center,
} from '@mantine/core'
import { useParams, useNavigate } from 'react-router'
import { useProductById } from '../../hooks/useProducts'

export const Product = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: product, isLoading, isError } = useProductById(id)

  if (isLoading) {
    return (
      <Center h={400}>
        <Loader color="red" />
      </Center>
    )
  }

  if (isError || !product) {
    return (
      <Center h={400}>
        <Text c="red">Product not found</Text>
      </Center>
    )
  }

  return (
    <Container size="lg" py={60}>
      <Button
        variant="light"
        color="red"
        onClick={() => navigate('/catalog')}
        mb="xl"
      >
        Back to Catalog
      </Button>

      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Image
            src={product.images?.[0]}
            fallbackSrc="https://placehold.co/600x400?text=No+image"
            radius="md"
            alt={product.title}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Box>
            <Group justify="space-between" mb="xs">
              <Title order={1}>{product.title}</Title>
              <Badge color="red" size="xl">
                ${product.price}
              </Badge>
            </Group>

            <Badge color="gray" mb="lg">
              {product.category?.name}
            </Badge>

            <Text size="lg" c="dimmed" mb="xl">
              {product.description}
            </Text>

            <Button color="red" size="lg" radius="md" fullWidth>
              Buy Now
            </Button>
          </Box>
        </Grid.Col>
      </Grid>
    </Container>
  )
}
