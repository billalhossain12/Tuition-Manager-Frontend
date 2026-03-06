import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppSelector } from "../../redux/hooks";
import { isNegative } from "../../utils/isNegative";
import { numberWithCommas } from "../../utils/numberWithCommas";
import { getCurrencySymbol } from "../../utils/getCurrencySymbol";
import { months } from "../../Features/Tools/Pages/COLC/colc.utils";
import { PrintModal } from "./PrintModal";

const getLivingIndex = (
  locationATotalPrice: number,
  locationBTotalPrice: number,
) => {
  if (!locationATotalPrice || !locationBTotalPrice) {
    return 0;
  }
  const totalLivingIndex =
    ((locationBTotalPrice - locationATotalPrice) / locationATotalPrice) * 100;
  return Number(totalLivingIndex?.toFixed(1));
};

export default function CustomCollapese() {
  const { COLCModifiedCostData } = useAppSelector(
    (state) => state.COLCalculator,
  );

  const {
    city1: {
      currency: city1CurrencyCode,
      contributors12months: city1Contributors12months,
      monthLastUpdate: city1MonthLastUpdate,
      yearLastUpdate: city1YearLastUpdate,
    } = {},
    city2: {
      currency: city2CurrencyCode,
      contributors12months: city2Contributors12months,
      monthLastUpdate: city2MonthLastUpdate,
      yearLastUpdate: city2YearLastUpdate,
    } = {},
  } = COLCModifiedCostData.metaData || {};

  const { selectedCityName1, selectedCityName2 } = useAppSelector(
    (state) => state.COLCalculator,
  );

  return (
    <>
      {COLCModifiedCostData?.output?.map((item) => {
        const { category, items } = item || {};
        return (
          <section key={category} className="relative">
            <div className="grid gap-2 grid-cols-6 font-semibold text-[1rem] p-1 mt-5 dark:text-darkModeHeadingTextColor">
              <p className="flex md:items-center gap-1 col-span-3">
                {category == "Restaurants" ? (
                  <Icon icon="ri:restaurant-2-fill" width="24" height="24" />
                ) : category == "Markets" ? (
                  <Icon icon="mdi:cart" width="24" height="24" />
                ) : category == "Transportation" ? (
                  <Icon icon="tabler:car-filled" width="24" height="24" />
                ) : category == "Rent Per Month" ? (
                  <Icon icon="fa6-solid:bed" width="24" height="24" />
                ) : category == "Utilities (Monthly)" ? (
                  <Icon icon="healthicons:electricity" width="24" height="24" />
                ) : category == "Buy Apartment Price" ? (
                  <Icon
                    icon="material-symbols:apartment"
                    width="24"
                    height="24"
                  />
                ) : category == "Salaries And Financing" ? (
                  <Icon icon="mingcute:wallet-fill" width="24" height="24" />
                ) : category == "Sports And Leisure" ? (
                  <Icon icon="maki:bicycle-share" width="24" height="24" />
                ) : category == "Clothing And Shoes" ? (
                  <Icon icon="map:clothing-store" width="24" height="24" />
                ) : category == "Childcare" ? (
                  <Icon icon="healthicons:child-care" width="24" height="24" />
                ) : (
                  ""
                )}
                <span>{category}</span>
              </p>
              <div>
                {selectedCityName1?.split(",").slice(0, -1).join(",").trim()}
              </div>

              <div>
                {selectedCityName2?.split(",").slice(0, -1).join(",").trim()}
              </div>
              <div>Difference</div>
            </div>

            {/* Children  */}
            <div
              className={`rounded-lg p-2 border-[1px] border-gray-200 dark:border-darkModeBorderColor bg-[#FBFBF8] dark:bg-darkModeBgColor dark:text-darkModeNormalTextColor md:text-[14px] text-[0.8rem]`}
            >
              {items?.map((item, index) => {
                const {
                  itemName,
                  city1ItemPrice,
                  city2ItemPrice,
                  city1OtherCurrencyItemPrice,
                  city2OtherCurrencyItemPrice,
                } = item || {};
                return (
                  <>
                    {itemName ==
                    "Mortgage Interest Rate in Percentages (%), Yearly, for 20 Years Fixed-Rate" ? (
                      <div
                        key={index}
                        className="grid gap-2 grid-cols-6 border-b-[1px] border-gray-300 dark:border-darkModeBorderColor rounded-lg hover:bg-[#42c6c623] p-1"
                      >
                        <p className="flex items-center col-span-3">
                          {itemName}
                        </p>
                        {Number(city1ItemPrice) ? (
                          <div className="flex items-center">
                            <p>
                              {numberWithCommas(
                                Number(city1ItemPrice.toFixed(2)),
                              )}
                            </p>
                          </div>
                        ) : (
                          <p>N/A</p>
                        )}

                        {Number(city2ItemPrice) ? (
                          <div className="flex items-center">
                            <p className="text-orange-700">
                              {numberWithCommas(
                                Number(city2ItemPrice.toFixed(2)),
                              )}
                            </p>
                          </div>
                        ) : (
                          <p>N/A</p>
                        )}
                        <p
                          className={`flex items-center justify-start ${
                            isNegative(
                              getLivingIndex(city1ItemPrice, city2ItemPrice),
                            )
                              ? "text-[#4CAF50]"
                              : "text-red-500"
                          }`}
                        >
                          {isNegative(
                            getLivingIndex(city1ItemPrice, city2ItemPrice),
                          )
                            ? getLivingIndex(city1ItemPrice, city2ItemPrice)
                            : `+${getLivingIndex(
                                city1ItemPrice,
                                city2ItemPrice,
                              )}`}
                          <span className="ml-1">%</span>
                        </p>
                      </div>
                    ) : (
                      <div
                        key={index}
                        className="grid gap-2 grid-cols-6 border-b-[1px] border-gray-300 dark:border-darkModeBorderColor rounded-lg hover:bg-[#42c6c623] p-1"
                      >
                        <p className="flex items-center col-span-3">
                          {itemName}
                        </p>
                        {Number(city1ItemPrice) ? (
                          <div>
                            <p>
                              {getCurrencySymbol(city1CurrencyCode as string)}{" "}
                              {numberWithCommas(
                                Number(city1ItemPrice.toFixed(2)),
                              )}
                            </p>
                            <p className="text-orange-700">
                              ({getCurrencySymbol(city2CurrencyCode as string)}{" "}
                              {numberWithCommas(
                                Number(city1OtherCurrencyItemPrice.toFixed(2)),
                              )}
                              )
                            </p>
                          </div>
                        ) : (
                          <p>N/A</p>
                        )}

                        {Number(city2ItemPrice) ? (
                          <div>
                            <p>
                              {getCurrencySymbol(city1CurrencyCode as string)}{" "}
                              {numberWithCommas(
                                Number(city2OtherCurrencyItemPrice.toFixed(2)),
                              )}
                            </p>
                            <p className="text-orange-700">
                              ({getCurrencySymbol(city2CurrencyCode as string)}{" "}
                              {numberWithCommas(
                                Number(city2ItemPrice.toFixed(2)),
                              )}
                              )
                            </p>
                          </div>
                        ) : (
                          <p>N/A</p>
                        )}
                        <p
                          className={`flex items-center justify-start ${
                            isNegative(
                              getLivingIndex(
                                city1ItemPrice,
                                city2OtherCurrencyItemPrice,
                              ),
                            )
                              ? "text-[#4CAF50]"
                              : "text-red-500"
                          }`}
                        >
                          {isNegative(
                            getLivingIndex(
                              city1ItemPrice,
                              city2OtherCurrencyItemPrice,
                            ),
                          )
                            ? `${getLivingIndex(
                                city1ItemPrice,
                                city2OtherCurrencyItemPrice,
                              )}`
                            : `+${getLivingIndex(
                                city1ItemPrice,
                                city2OtherCurrencyItemPrice,
                              )}`}
                          <span className="ml-1">%</span>
                        </p>
                      </div>
                    )}
                  </>
                );
              })}
            </div>
          </section>
        );
      })}
      <div className="rounded-lg bg-[#FBFBF8] dark:bg-darkModeBgColor dark:text-darkModeNormalTextColor border-[1px] border-gray-200 dark:border-darkModeBorderColor mt-2 p-2 text-[14px]">
        <div className="grid gap-2 grid-cols-6 border-b-[1px] border-gray-300 dark:border-darkModeBorderColor hover:bg-[#42c6c623] p-1">
          <p className="flex items-center col-span-3">Last update:</p>
          <p>
            {months[(city1MonthLastUpdate as number) - 1]} {city1YearLastUpdate}
          </p>
          <p>
            {months[(city2MonthLastUpdate as number) - 1]} {city2YearLastUpdate}
          </p>
        </div>
        <div className="grid gap-2 grid-cols-6 border-b-[1px] border-gray-300 dark:border-darkModeBorderColor hover:bg-[#42c6c623] p-1">
          <p className="flex items-center col-span-3">
            Contributors in the past 12 months:
          </p>
          <p>{city1Contributors12months}</p>
          <p>{city2Contributors12months}</p>
        </div>
      </div>
        <div className="mt-5"><PrintModal title="Cost Of Living Calculator Report"/></div>
    </>
  );
}
