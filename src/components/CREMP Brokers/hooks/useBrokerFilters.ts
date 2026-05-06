import { useState, useMemo, useCallback } from 'react';
import type { Broker, ActiveFilters, BrokerSortOption } from '../types/broker.types';
import { brokersData } from '../data/brokersData';
import { matchesExperienceRange, sortBrokers } from '../utils/brokerHelpers';

const DEFAULT_FILTERS: ActiveFilters = {
  specialties: [],
  locations: [],
  dealTypes: [],
  dealSizes: [],
  experience: null,
  rating: null,
  search: '',
};

export function useBrokerFilters() {
  const [filters, setFilters] = useState<ActiveFilters>(DEFAULT_FILTERS);
  const [sortOption, setSortOption] = useState<BrokerSortOption>('relevance');

  const filteredBrokers = useMemo<Broker[]>(() => {
    let result = brokersData.filter((broker) => {
      // Search filter
      if (filters.search.trim()) {
        const q = filters.search.toLowerCase();
        const matchesName = broker.name.toLowerCase().includes(q);
        const matchesCompany = broker.company.toLowerCase().includes(q);
        const matchesLocation = broker.location.toLowerCase().includes(q);
        const matchesSpecialty = broker.specialties.some((s) =>
          s.toLowerCase().includes(q)
        );
        if (!matchesName && !matchesCompany && !matchesLocation && !matchesSpecialty) {
          return false;
        }
      }

      // Specialties filter
      if (filters.specialties.length > 0) {
        const hasSpecialty = filters.specialties.some((s) =>
          broker.specialties.includes(s as Broker['specialties'][number])
        );
        if (!hasSpecialty) return false;
      }

      // Location filter
      if (filters.locations.length > 0) {
        if (!filters.locations.includes(broker.cityArea)) return false;
      }

      // Experience filter
      if (filters.experience) {
        if (!matchesExperienceRange(broker.experienceYears, filters.experience)) {
          return false;
        }
      }

      // Rating filter
      if (filters.rating) {
        const minRating = parseFloat(filters.rating);
        if (broker.rating < minRating) return false;
      }

      return true;
    });

    return sortBrokers(result, sortOption);
  }, [filters, sortOption]);

  const setSearch = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, search: value }));
  }, []);

  const toggleSpecialty = useCallback((specialty: string) => {
    setFilters((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty],
    }));
  }, []);

  const toggleLocation = useCallback((location: string) => {
    setFilters((prev) => ({
      ...prev,
      locations: prev.locations.includes(location)
        ? prev.locations.filter((l) => l !== location)
        : [...prev.locations, location],
    }));
  }, []);

  const setExperience = useCallback((value: string | null) => {
    setFilters((prev) => ({
      ...prev,
      experience: prev.experience === value ? null : value,
    }));
  }, []);

  const toggleDealType = useCallback((value: string) => {
    setFilters((prev) => ({
      ...prev,
      dealTypes: prev.dealTypes.includes(value)
        ? prev.dealTypes.filter((d) => d !== value)
        : [...prev.dealTypes, value],
    }));
  }, []);

  const toggleDealSize = useCallback((value: string) => {
    setFilters((prev) => ({
      ...prev,
      dealSizes: prev.dealSizes.includes(value)
        ? prev.dealSizes.filter((d) => d !== value)
        : [...prev.dealSizes, value],
    }));
  }, []);

  const setRating = useCallback((value: string | null) => {
    setFilters((prev) => ({
      ...prev,
      rating: prev.rating === value ? null : value,
    }));
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setSortOption('relevance');
  }, []);

  const activeFilterCount =
    filters.specialties.length +
    filters.locations.length +
    filters.dealTypes.length +
    filters.dealSizes.length +
    (filters.experience ? 1 : 0) +
    (filters.rating ? 1 : 0);

  return {
    filters,
    sortOption,
    setSortOption,
    filteredBrokers,
    setSearch,
    toggleSpecialty,
    toggleLocation,
    toggleDealType,
    toggleDealSize,
    setExperience,
    setRating,
    clearAllFilters,
    activeFilterCount,
  };
}
