import { UsagePurpose } from "../../models";
import { updateQueryParam } from "../../shared/utils/query-params";

export function validateUsageQuery(params: URLSearchParams): UsagePurpose {
  const hasParam = params.has("usage");
  if (hasParam) {
    const paramValue = params.get("usage") as UsagePurpose;
    if (Object.values(UsagePurpose).includes(paramValue)) {
      return paramValue;
    }
  }
  updateQueryParam("usage", UsagePurpose.BUY);
  return UsagePurpose.BUY;
}
