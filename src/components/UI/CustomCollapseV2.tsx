import { Icon } from "@iconify/react";
import { useMemo } from "react";
import { useAppSelector } from "../../redux/hooks";
import { isNegative } from "../../utils/isNegative";
import { numberWithCommas } from "../../utils/numberWithCommas";
import { getCurrencySymbol } from "../../utils/getCurrencySymbol";

const getLivingIndex = (a?: number, b?: number) => {
  if (!a || !b) return 0;
  return Number((((b - a) / a) * 100).toFixed(1));
};

const categoryIcons: Record<string, string> = {
  Restaurants: "ri:restaurant-2-fill",
  Markets: "mdi:cart",
  Transportation: "tabler:car-filled",
  "Rent Per Month": "fa6-solid:bed",
  "Utilities (Monthly)": "healthicons:electricity",
  "Buy Apartment Price": "material-symbols:apartment",
  "Salaries And Financing": "mingcute:wallet-fill",
  "Sports And Leisure": "maki:bicycle-share",
  "Clothing And Shoes": "map:clothing-store",
  Childcare: "healthicons:child-care",
};

export default function CustomCollapseV2() {
  const { COLCModifiedCostData, selectedCityName1, selectedCityName2 } =
    useAppSelector((state) => state.COLCalculator);

  const meta = COLCModifiedCostData?.metaData || {};
  const city1 = meta?.city1 || {};
  const city2 = meta?.city2 || {};

  const city1Name = useMemo(
    () => selectedCityName1?.split(",").slice(0, -1).join(",").trim(),
    [selectedCityName1]
  );

  const city2Name = useMemo(
    () => selectedCityName2?.split(",").slice(0, -1).join(",").trim(),
    [selectedCityName2]
  );

  return (
    <div className="space-y-8">
      {COLCModifiedCostData?.output?.map((section: any) => {
        const { category, items } = section;

        return (
          <section key={category}>
            {/* Category Header */}
            <div className="flex items-center gap-2 font-semibold text-base mb-3">
              {categoryIcons[category] && (
                <Icon icon={categoryIcons[category]} width={20} />
              )}
              <span>{category}</span>
            </div>

            <table className="w-full text-sm border border-gray-200 dark:border-darkModeBorderColor rounded-lg overflow-hidden">
              <thead className="hidden md:table-header-group bg-gray-100 dark:bg-darkModeBorderColor">
                <tr className="text-left">
                  <th className="p-3">Item</th>
                  <th className="p-3">{city1Name}</th>
                  <th className="p-3">{city2Name}</th>
                  <th className="p-3 text-right">Difference</th>
                </tr>
              </thead>

              <tbody>
                {items?.map((item: any, index: number) => {
                  const {
                    itemName,
                    city1ItemPrice,
                    city2ItemPrice,
                    city1OtherCurrencyItemPrice,
                    city2OtherCurrencyItemPrice,
                  } = item;

                  const isMortgage =
                    itemName ===
                    "Mortgage Interest Rate in Percentages (%), Yearly, for 20 Years Fixed-Rate";

                  const difference = getLivingIndex(
                    city1ItemPrice,
                    isMortgage
                      ? city2ItemPrice
                      : city2OtherCurrencyItemPrice
                  );

                  const isNeg = isNegative(difference);

                  return (
                    <tr
                      key={index}
                      className="border-t md:table-row block md:block"
                    >
                      {/* MOBILE VIEW */}
                      <td className="block md:hidden p-3 space-y-2">
                        <p className="font-semibold">{itemName}</p>

                        <div className="flex gap-3">
                          <span className="text-gray-500">{city1Name}</span>
                          <span>
                            {city1ItemPrice ? (
                              <>
                                {getCurrencySymbol(city1.currency)}{" "}
                                {numberWithCommas(
                                  Number(city1ItemPrice.toFixed(2))
                                )}
                                {!isMortgage &&
                                  city1OtherCurrencyItemPrice && (
                                    <span className="text-orange-600 text-xs ml-1">
                                      (
                                      {getCurrencySymbol(city2.currency)}{" "}
                                      {numberWithCommas(
                                        Number(
                                          city1OtherCurrencyItemPrice.toFixed(
                                            2
                                          )
                                        )
                                      )}
                                      )
                                    </span>
                                  )}
                              </>
                            ) : (
                              "N/A"
                            )}
                          </span>
                        </div>

                        <div className="flex gap-3">
                          <span className="text-gray-500">{city2Name}</span>
                          <span>
                            {city2ItemPrice ? (
                              <>
                                {getCurrencySymbol(city2.currency)}{" "}
                                {numberWithCommas(
                                  Number(city2ItemPrice.toFixed(2))
                                )}
                                {!isMortgage &&
                                  city2OtherCurrencyItemPrice && (
                                    <span className="text-orange-600 text-xs ml-1">
                                      (
                                      {getCurrencySymbol(city1.currency)}{" "}
                                      {numberWithCommas(
                                        Number(
                                          city2OtherCurrencyItemPrice.toFixed(
                                            2
                                          )
                                        )
                                      )}
                                      )
                                    </span>
                                  )}
                              </>
                            ) : (
                              "N/A"
                            )}
                          </span>
                        </div>

                        <div className="flex gap-3 font-semibold">
                          <span>Difference</span>
                          <span
                            className={
                              isNeg
                                ? "text-green-500"
                                : "text-red-500"
                            }
                          >
                            {isNeg ? difference : `+${difference}`}%
                          </span>
                        </div>
                      </td>

                      {/* DESKTOP VIEW */}
                      <td className="hidden md:table-cell p-3">
                        {itemName}
                      </td>

                      <td className="hidden md:table-cell p-3">
                        {city1ItemPrice ? (
                          <>
                            {getCurrencySymbol(city1.currency)}{" "}
                            {numberWithCommas(
                              Number(city1ItemPrice.toFixed(2))
                            )}
                            {!isMortgage &&
                              city1OtherCurrencyItemPrice && (
                                <p className="text-orange-600 text-xs">
                                  (
                                  {getCurrencySymbol(city2.currency)}{" "}
                                  {numberWithCommas(
                                    Number(
                                      city1OtherCurrencyItemPrice.toFixed(
                                        2
                                      )
                                    )
                                  )}
                                  )
                                </p>
                              )}
                          </>
                        ) : (
                          "N/A"
                        )}
                      </td>

                      <td className="hidden md:table-cell p-3">
                        {city2ItemPrice ? (
                          <>
                            {getCurrencySymbol(city2.currency)}{" "}
                            {numberWithCommas(
                              Number(city2ItemPrice.toFixed(2))
                            )}
                            {!isMortgage &&
                              city2OtherCurrencyItemPrice && (
                                <p className="text-orange-600 text-xs">
                                  (
                                  {getCurrencySymbol(city1.currency)}{" "}
                                  {numberWithCommas(
                                    Number(
                                      city2OtherCurrencyItemPrice.toFixed(
                                        2
                                      )
                                    )
                                  )}
                                  )
                                </p>
                              )}
                          </>
                        ) : (
                          "N/A"
                        )}
                      </td>

                      <td className="hidden md:table-cell p-3 text-right font-semibold">
                        <span
                          className={
                            isNeg
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {isNeg ? difference : `+${difference}`}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        );
      })}
    </div>
  );
}
