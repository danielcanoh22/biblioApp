import type { Pagination } from "~/types/globals";
import { useSearchParams } from "react-router";
import { Button } from "./button";

type PaginationProps = {
  pagination: Pagination;
};

export const PaginationControls = ({ pagination }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleNext = () => {
    const currentPage = pagination.currentPage;

    if (currentPage < pagination.totalPages) {
      searchParams.set("page", String(currentPage + 1));
    }

    setSearchParams(searchParams);
  };

  const handlePrevious = () => {
    const currentPage = pagination.currentPage;

    if (currentPage <= 2) {
      searchParams.delete("page");
    } else if (currentPage > 1) {
      searchParams.set("page", String(currentPage - 1));
    }

    setSearchParams(searchParams);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        isDisabled={pagination.currentPage === 1}
        onClick={handlePrevious}
      >
        Atrás
      </Button>
      <Button
        isDisabled={pagination.currentPage === pagination.totalPages}
        onClick={handleNext}
      >
        Siguiente
      </Button>
    </div>
  );
};
