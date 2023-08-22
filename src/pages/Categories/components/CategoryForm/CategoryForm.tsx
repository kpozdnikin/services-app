import { VFC } from 'react';

import { Confirm } from '@app/components';
import { Category } from '@app/interfaces';
import { WithoutId } from '@app/types';
import { isPresent } from '@app/utils';
import { appRoutes } from '@app/config';
import { useCommanderNavigation, useServiceApp, useTranslator } from '@app/hooks';

import { useServiceCategoryForm, useServiceCategorySubmit } from '../../hooks';

interface CategoryFormProps {
  category: Category | WithoutId<Category>;
}

export const CategoryForm: VFC<CategoryFormProps> = ({ category }) => {
  const form = useServiceCategoryForm(category);
  const { features } = useServiceApp();
  const { canModifyCategories } = features;
  const { register, formState, handleSubmit } = form;
  const { errors, isDirty, isSubmitting } = formState;

  const {
    handleAddCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    loading,
  } = useServiceCategorySubmit();
  const handleNavigateClick = useCommanderNavigation();
  const t = useTranslator();

  const performSubmit = (submittedCategory: Category) => {
    if ('id' in category) {
      handleUpdateCategory({
        ...category,
        ...submittedCategory,
      });
    } else {
      handleAddCategory(submittedCategory);
    }
  };

  const performDelete = async () => {
    if ('id' in category) {
      const confirmed = await Confirm(
        t('pages.categories.form.deleteConfirm.message'),
        t('pages.categories.form.deleteConfirm.title'),
        [
          {
            variant: 'secondary',
            text: t('pages.categories.form.deleteConfirm.buttons.cancel'),
            type: 'cancel',
          },
          {
            variant: 'danger',
            text: t('pages.categories.form.deleteConfirm.buttons.delete'),
            type: 'ok',
          },
        ],
      );

      if (confirmed) {
        handleDeleteCategory(category.id);
      }
    }
  };

  const canSubmitCategory =
    isDirty && !isPresent(errors.name) && canModifyCategories && !loading;
  const canDeleteCategory = canModifyCategories && !loading;

  return (
    <form onSubmit={handleSubmit(performSubmit)}>
      <fieldset disabled={isSubmitting}>
        <div className="u-ph">
          <div className="layout">
            <div className="layout__item">
              <span className="c-label-new">{t('pages.categories.form.name.label')}</span>
              <div className="u-position-relative">
                <input
                  className="c-input"
                  disabled={!canModifyCategories}
                  placeholder={t('pages.categories.form.name.placeholder')}
                  type="text"
                  {...register('name')}
                />
                {!!errors.name && (
                  <div className="c-input-error-message">{errors.name?.message}</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="c-separator u-mv" />
        <div className="u-text-right">
          {'id' in category && (
            <button
              data-automation-id="delete-category-button"
              disabled={!canDeleteCategory}
              type="button"
              className="c-btn c-btn--red u-width-120 u-mr- u-float-left"
              onClick={performDelete}
            >
              <span className="c-btn__text">
                {t('pages.categories.form.buttons.delete')}
              </span>
            </button>
          )}
          <a
            className="c-btn c-btn--grey u-width-120 u-mr--"
            href={appRoutes.categories}
            data-automation-id="cancel-editing-category-button"
            onClick={(e) => handleNavigateClick(appRoutes.categories, e)}
          >
            <span className="c-btn__text">
              {t('pages.categories.form.buttons.cancel')}
            </span>
          </a>
          <button
            type="submit"
            className="c-btn u-width-120"
            disabled={!canSubmitCategory}
          >
            <span className="c-btn__text">{t('pages.categories.form.buttons.save')}</span>
          </button>
        </div>
      </fieldset>
    </form>
  );
};
