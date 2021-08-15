import { useMutation, useQueryClient } from "react-query";
import { Marker } from "../../types";
import { eMethod, fetcher, useFetch } from "./commun";

const ROOT_URL = "http://localhost:3030/markers";

export const useMarkers = () => useFetch("markers", ROOT_URL);

export const useCreateMarker = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (marker: Omit<Marker, "id">) => fetcher(ROOT_URL, eMethod.POST, marker),
    {
      onSuccess: () => queryClient.invalidateQueries(),
    }
  );
  return mutation;
};
