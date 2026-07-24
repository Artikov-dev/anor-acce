import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
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

  return useMutation<
    IProduct,
    AxiosError<{ message?: string }>,
    CreateProductDto
  >({
    mutationFn: (dto: CreateProductDto) => createProductApi(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<
    IProduct,
    AxiosError<{ message?: string }>,
    { id: number; dto?: UpdateProductDto; data?: UpdateProductDto }
  >({
    mutationFn: ({ id, dto, data }) => updateProductApi(id, (dto || data)!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<
    boolean,
    AxiosError<{ message?: string }>,
    number,
    { previousQueries: [readonly unknown[], IProduct[] | undefined][] }
  >({
    mutationFn: (id: number) => deleteProductApi(id),
    onMutate: async (deletedId: number) => {
      await queryClient.cancelQueries({ queryKey: ['products'] })

      const previousQueries = queryClient.getQueriesData<IProduct[]>({
        queryKey: ['products'],
      })

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
      if (context?.previousQueries) {
        context.previousQueries.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
    },
    onSettled: () => {
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
