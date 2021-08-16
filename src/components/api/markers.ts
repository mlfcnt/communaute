import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { Marker } from "../../types";
import { eMethod, fetcher, useFetch } from "./commun";

const ROOT_URL = "http://localhost:3030/markers";

export const useMarkers = (): {
  data: unknown;
  loading: boolean;
  error: unknown;
} => useFetch("markers", ROOT_URL);
export const useMarkersCategories = (): any =>
  useFetch("markers-categories", "http://localhost:3030/markers-categories");

export const useCreateMarker = (): UseMutationResult<
  unknown,
  unknown,
  Omit<Marker, "id">,
  unknown
> => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (marker: Omit<Marker, "id">) => fetcher(ROOT_URL, eMethod.POST, marker),
    {
      onSuccess: () => queryClient.invalidateQueries(),
    }
  );
  return mutation;
};
