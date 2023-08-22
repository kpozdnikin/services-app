import { useState } from 'react';
import { useApiMutation } from '@getsquire/handyman/api';

import { Category, BrandId, UseServiceCategoryMutationResult } from '@app/interfaces';
import { WithoutId } from '@app/types';
import { appRoutes } from '@app/config';
import { useCommanderNavigation } from '@app/hooks';
import { BrandServiceCategoryApiService } from '@app/api';

export const useBrandServiceCategoryMutation = (
  payload: BrandId,
): UseServiceCategoryMutationResult => {
  const { brandId } = payload;

  const handleNavigate = useCommanderNavigation();

  const onSuccess = () => {
    handleNavigate(appRoutes.categories);
  };

  const addCategory = useApiMutation({
    endpoint: BrandServiceCategoryApiService.brandServiceAddCategory,
    options: {
      onSuccess,
    },
  });

  const deleteCategory = useApiMutation({
    endpoint: BrandServiceCategoryApiService.brandServiceDeleteCategory,
    options: {
      onSuccess,
    },
  });

  const updateCategory = useApiMutation({
    endpoint: BrandServiceCategoryApiService.brandServiceUpdateCategory,
    options: {
      onSuccess,
    },
  });

  const handleAddCategory = (category: WithoutId<Category>) => {
    return addCategory.mutateAsync({
      category,
      brandId,
    });
  };

  const handleDeleteCategory = (categoryId: string) => {
    return deleteCategory.mutateAsync({
      brandId,
      categoryId,
    });
  };

  const handleUpdateCategory = (category: Category) => {
    return updateCategory.mutateAsync({
      category,
      brandId,
    });
  };

  const loading =
    addCategory.isLoading || deleteCategory.isLoading || updateCategory.isLoading;

  return {
    handleAddCategory,
    handleDeleteCategory,
    handleUpdateCategory,
    loading,
  };
};
