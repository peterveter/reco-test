import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface AppsListPayload {
  appName: string;
  category: string;
  pageNumber: number;
  pageSize: number;
}

interface AppListItem {
  appId: string;
  appName: string;
  appSources: string[];
  category: string;
}

export interface AppsListResponse {
  appRows: AppListItem[];
  totalCount: 0;
}

const BASE_URL = "https://recotest.pythonanywhere.com";

const APPS_QUERY_KEYS_ENUM = {
  APPS_LIST: "APPS_LIST",
};

async function getAppsList(
  payload: AppsListPayload,
): Promise<AppsListResponse> {
  const response = await axios.put(
    `${BASE_URL}/api/v1/app-service/get-apps`,
    payload,
  );
  return response.data;
}

export const useGetAppsList = (payload: AppsListPayload) => {
  return useQuery({
    queryKey: [APPS_QUERY_KEYS_ENUM.APPS_LIST, payload],
    queryFn: () => getAppsList(payload),
  });
};
