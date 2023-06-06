'use client'
import React, { useState, ReactNode } from "react";
type TabProps = {
  label: string;
  activeTab?: string;
  onClick: (tab: string) => void;
};

const Tab = ({ label, activeTab, onClick }: TabProps) => {
  const isActive = activeTab === label;

  return (
    <li className={isActive ? "w-[33%] active border border-[#EBEBEB] bg-white shadow-[0px_2px_15px rgba(0, 0, 0, 0.15)]" : "border-[#FCFCFC] bg-[#F3F1F1] w-[33%]"}>
      <button onClick={() => onClick(label)} className="pdp-tab-btn w-full h-[48px] rounded text-[13px] font-[700] flex justify-center items-center">
        {label}
      </button>
    </li>
  );
};

type TabContentProps = {
  children?: ReactNode;
  activeTab?: string;
  label: string;
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
    <div className="pdp-tab w-full my-8">
      <ul className="flex w-full border justify-between bg-[#F3F1F1] rounded">
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return null;

          const { label } = child.props;
          return (
            <Tab
              key={child.props.label}
              activeTab={activeTab}
              onClick={onClickTabItem}
              label={label}
            />
          );
        })}
      </ul>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return null;

        const { label } = child.props;
        if (label !== activeTab) return null;

        return <div key={label}>{child.props.children}</div>;
      })}
    </div>
  );
};
