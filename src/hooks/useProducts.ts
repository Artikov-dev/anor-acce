import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getProductsApi,
  getProductApi,
  createProductApi,
  updateProductApi,
  deleteProductApi,
} from '@/api/products'
import type {
  ProductQueryParams,
  CreateProductDto,
  UpdateProductDto,
  IProduct,
} from '@/types/product'

export const useProductsQuery = (params?: ProductQueryParams) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => getProductsApi(params),
    staleTime: 1000 * 60 * 2,
  })
}

export const useProductQuery = (id: number | null) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => getProductApi(id!),
    enabled: !!id,
  })
}

export const usePrefetchProduct = () => {
  const queryClient = useQueryClient()

  return (id: number) => {
    queryClient.prefetchQuery({
      queryKey: ['products', id],
      queryFn: () => getProductApi(id),
      staleTime: 1000 * 60 * 5,
    })
  }
}

export const useCreateProductMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (dto: CreateProductDto) => createProductApi(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      dto,
      data,
    }: {
      id: number
      dto?: UpdateProductDto
      data?: UpdateProductDto
    }) => updateProductApi(id, (dto || data)!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteProductApi(id),
    onMutate: async (deletedId: number) => {
      // Cancel outgoing refetches so they don't overwrite optimistic update
      await queryClient.cancelQueries({ queryKey: ['products'] })

      // Snapshot all matching product query cache entries
      const previousQueries = queryClient.getQueriesData<IProduct[]>({
        queryKey: ['products'],
      })

      // Optimistically update matching caches
      queryClient.setQueriesData<IProduct[]>(
        { queryKey: ['products'] },
        (oldData) => {
          if (!oldData) return []
          return oldData.filter((item) => item.id !== deletedId)
        }
      )

      return { previousQueries }
    },
    onError: (_err, _deletedId, context) => {
      // Rollback to previous queries snapshot if mutation fails
      if (context?.previousQueries) {
        context.previousQueries.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
    },
    onSettled: () => {
      // Invalidate to get exact server state
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export const useProducts = useProductsQuery
export const useProductById = useProductQuery
export const useCreateProduct = useCreateProductMutation
export const useUpdateProduct = useUpdateProductMutation
export const useDeleteProduct = useDeleteProductMutation
export { useCategoriesQuery as useCategories } from './useCategories'
