'use client';

import { useSearchParams, useRouter } from 'next/navigation';

const useFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateSearchParam = (paramName: string, value: string | null | undefined) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    if (value === null || value === undefined) {
      currentParams.delete(paramName);
    } else {
      currentParams.set(paramName, value);
    }

    router.push(`?${currentParams.toString()}`,  { scroll: false });
  };

  const handleCheckboxFilter = (paramName: string, value: string, isChecked: boolean) => {
    const currentParam = searchParams.get(paramName) || '';
    const values = currentParam ? currentParam.split(',') : [];

    let newValues: string[];
    if (isChecked) {
      newValues = [...values, value].filter((v, i, a) => a.indexOf(v) === i);
    } else {
      newValues = values.filter((v) => v !== value);
    }

    updateSearchParam(paramName, newValues.length ? newValues.join(',') : null);
  };

  const handleButtonFilter = (paramName: string, value: string, isActive: boolean) => {
    if (isActive) {
      updateSearchParam(paramName, value);
    } else {
      updateSearchParam(paramName, null);
    }
  };

  const handleMultiButtonFilter = (paramName: string, value: string, isActive: boolean) => {
    const currentParam = searchParams.get(paramName) || '';
    const values = currentParam ? currentParam.split(',') : [];

    let newValues: string[];
    if (isActive) {
      newValues = [...values, value].filter((v, i, a) => a.indexOf(v) === i);
    } else {
      newValues = values.filter((v) => v !== value);
    }

    updateSearchParam(paramName, newValues.length ? newValues.join(',') : null);
  };

  const handleInputFilter = (paramName: string, value: string) => {
    if (!value || value === '') {
      updateSearchParam(paramName, null);
    } else {
      updateSearchParam(paramName, value);
    }
  };

  const isCheckboxSelected = (paramName: string, value: string): boolean => {
    const param = searchParams.get(paramName);
    if (!param) return false;

    const values = param.split(',');
    return values.includes(value);
  };

  const isValueInMultiParam = (paramName: string, value: string): boolean => {
    return isCheckboxSelected(paramName, value);
  };

  const isButtonActive = (paramName: string, value: string): boolean => {
    return searchParams.get(paramName) === value;
  };

  const getInputValue = (paramName: string): string => {
    return searchParams.get(paramName) || '';
  };

  const getActiveFilters = (): { [key: string]: string } => {
    const filters: { [key: string]: string } = {};
    for (const [key, value] of searchParams.entries()) {
      filters[key] = value;
    }
    return filters;
  };

  const resetAllFilters = () => {
    router.push('?', { scroll: false });
  };

const handleMultiInputFilter = (params: Record<string, string | null>) => {
  const currentParams = new URLSearchParams(window.location.search);

  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === '') {
      currentParams.delete(key);
    } else {
      currentParams.set(key, value.toString());
    }
  });

  const newUrl = `?${currentParams.toString()}`;
  
  router.replace(newUrl,  { scroll: false });
};

  return {
    handleCheckboxFilter,
    handleButtonFilter,
    handleMultiButtonFilter,
    handleInputFilter,
    isCheckboxSelected,
    isValueInMultiParam,
    isButtonActive,
    getInputValue,
    getActiveFilters,
    resetAllFilters,
    updateSearchParam,
    handleMultiInputFilter
  };
};

export default useFilter;
