import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { Category } from '@app/interfaces';
import { WithoutId } from '@app/types';
import { useYup } from '@app/hooks';

export const categoryName = (yupFn: typeof yup) => yupFn.string().required().min(2);

export const useServiceCategoryForm = (category?: Category | WithoutId<Category>) => {
  const yup = useYup();
  const schema = yup
    .object()
    .shape({
      name: categoryName(yup),
    })
    .required();

  return useForm<WithoutId<Category>>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      name: category?.name,
    },
  });
};
