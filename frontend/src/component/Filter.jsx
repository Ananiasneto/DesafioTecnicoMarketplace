import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { ArrowDown01Icon, SaleTag02Icon, Search01Icon } from "hugeicons-react";

export default function Filter({ onFilterApply }) {
  const [filters, setFilters] = useState({
    search: "", 
    status: ""
  });

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const applyFilters = async () => {
    try {
      const token = localStorage.getItem("token");
      const params = {};
      
      if (filters.status) params.status = filters.status;
      if (filters.search) params.category = filters.search;

      const hasFilters = filters.status || filters.search;
      const endpoint = hasFilters ? 'filter' : 'all';
      
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/${endpoint}`, {
        headers: { 
          Authorization: `Bearer ${token}` 
        },
        params: hasFilters ? params : {}
      });

      if (response.data.length === 0 && hasFilters) {
        alert("Nenhum produto encontrado");
      }

      if (onFilterApply) {
        onFilterApply(response.data);
      }

    } catch (error) {
      console.error("Erro ao aplicar filtros:", error);
      alert("Erro ao aplicar filtros");
    }
  };


  return (
    <FilterContainer>
      <FilterHeader>
        <h3>Filtrar</h3>
      </FilterHeader>

      <FilterGroup>
        <FilterField>
          <FilterDiv>
            <Search01Icon size={18} />
            <SearchInput
              type="text"
              placeholder="Pesquisar"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </FilterDiv>
        </FilterField>

        <FilterField>
          <FilterDiv>
            <SaleTag02Icon size={18} />
            <Select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
            >
              <option value="">Status</option>
              <option value="announced">Anunciado</option>
              <option value="disable">Desativado</option>
              <option value="sold">Vendido</option>
            </Select>
            <ArrowDown01Icon size={16} />
          </FilterDiv>
        </FilterField>
      </FilterGroup>

      <Divider />

      <ApplyButton onClick={applyFilters}>
        Aplicar filtro
      </ApplyButton>
    </FilterContainer>
  );
}

const FilterContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 250px;
`;

const FilterHeader = styled.div`
  margin-bottom: 20px;
  
  h3 {
    margin: 0;
    color: #333;
    font-size: 18px;
    font-weight: 600;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 15px;
`;

const FilterField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const FilterDiv = styled.div`
  display:flex;
  align-items:center;
  border-bottom: 2px solid #ccc;
`;

const SearchInput = styled.input`
  padding: 10px 12px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s ease;
  
  &::placeholder {
    color: #999;
  }
`;

const Select = styled.select`
  padding: 10px ;
  border: none;
  font-size: 14px;
  background: transparent;
  cursor: pointer;
  outline: none;
  appearance: none;
  flex: 1;
  width: 100%;
  color: #333;

  & option {
    color: #333;
    padding: 8px;
  };`

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 15px 0;
`;

const ApplyButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #f24d0d;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #e63c00;
  }
`;