"use client";
import React, { useState, ReactNode } from "react";
type TabProps = {
  label: string;
  colorLabel: string;
  activeTab?: string;
  onClick: (tab: string) => void;
};

const Tab = ({ label, activeTab, onClick, colorLabel }: TabProps) => {
  const isActive = activeTab === label;

  return (
    <div
      className={
        isActive
          ? "active border-[3px] border-transparent border-b-[#008ECC] text-[#666666]"
          : "border-[3px] border-transparent border-b-[#C1C1C1]  text-[#C1C1C1]"
      }
    >
      <button
        onClick={() => onClick(label)}
        className={`tab_btn h-[46px] text-[22px] xl:text-[22px] lg:text-[22px] md:text-[18px] sm:text-[16px]  font-[500] flex  items-center gap-1 border-3 border-blue-500 pr-4`}
      >
        {label}{" "}
        <span className={isActive ? "text-[#008ECC]" : "text-[#C1C1C1]"}>
          {colorLabel}
        </span>
      </button>
    </div>
  );
};

type TabContentProps = {
  children?: ReactNode;
  activeTab?: string;
  label: string;
  colorLabel: string;
};

export const TabContent = ({ children, activeTab, label }: TabContentProps) => {
  if (activeTab !== label) return null;
  return <div>{children}</div>;
};

type TabsProps = {
  children: ReactNode;
};

export const Tabs = ({ children }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(
    (children as React.ReactElement<TabContentProps>[])[0].props.label
  );

  const onClickTabItem = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full">
      <div className="w-full overflow-auto tab-container my-[50px] mb-[25px]">
        <div className="min-w-[680px] flex border border-transparent border-b-[#B4B3B3]  justify-between">
          {React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) return null;

            const { label, colorLabel } = child.props;
            return (
              <Tab
                key={child.props.label}
                activeTab={activeTab}
                onClick={onClickTabItem}
                label={label}
                colorLabel={colorLabel}
              />
            );
          })}
        </div>
      </div>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return null;

        const { label } = child.props;
        if (label !== activeTab) return null;

        return <div key={label}>{child.props.children}</div>;
      })}
    </div>
  );
};
