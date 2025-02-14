import { Check, ChevronDown, Mail, Save, User, X } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";
import Drawer from "rsuite/Drawer";
import DatePicker from "rsuite/DatePicker";
import { Toggle } from "rsuite";
import DropdownList from "../Dropdown";
import { STAGES } from "@/services/utils/stages";
import { ILead, STAGE } from "@/types/lead";
import useCompanies from "@/hooks/useCompanies";
import { ICompany } from "@/types/company";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleLeadDrawer } from "@/store/app";

interface IProps {
  onSave: (lead: ILead) => Promise<void>;
}

const emptyLead = {
  name: "",
  email: "",
  company_id: null,
  company_name: "",
  stage: STAGE.PROSPECT,
  last_contacted_at: null,
  engaged: false,
};

const AddOrEditLeadDrawer: React.FC<IProps> = ({ onSave }) => {
  const { isLeadDrawerOpen: isOpen, leadToEdit } = useAppSelector((state) => state.app);
  const { data: companies } = useCompanies();

  const dispatch = useAppDispatch();

  const [lead, setLead] = useState<ILead>(emptyLead);
  const [filteredCompanies, setFilteredCompanies] = useState<ICompany[]>([]);
  const [companyDropdown, setCompanyDropdown] = useState(false);
  const companyDropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (companyDropdownRef.current && !companyDropdownRef.current.contains(event.target as Node)) {
      setCompanyDropdown(false);
    }
  };

  useEffect(() => {
    if (companies) setFilteredCompanies(companies);
  }, [companies]);

  useEffect(() => {
    if (isOpen && leadToEdit) setLead(leadToEdit);
    else setLead(emptyLead);
  }, [isOpen, leadToEdit]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Drawer open={isOpen} onClose={() => dispatch(toggleLeadDrawer())} size="min(500px,100%)">
      <Drawer.Header>
        <Drawer.Title>{leadToEdit ? "Edit Lead" : "Add a New Lead"}</Drawer.Title>
        <Drawer.Actions>
          <button
            onClick={() => onSave(lead)}
            className="transition-all flex items-center justify-center gap-2 outline-none cursor-pointer hover:shadow text-primary py-2 pl-3 pr-4 bg-white rounded-lg">
            <Save size={18} />
            Save
          </button>
        </Drawer.Actions>
      </Drawer.Header>
      <Drawer.Body className="!p-6">
        <div className="flex flex-col gap-6">
          {/* name input field */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <div className="relative w-full flex items-center">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                id="text"
                type="text"
                value={lead.name}
                onChange={(e) =>
                  setLead({
                    ...lead,
                    name: e.target.value,
                  })
                }
                className="pl-10 w-full p-3 bg-gray-50 border border-gray-200 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A1BE0] focus:border-transparent"
                placeholder="John Doe"
                required
              />
            </div>
          </div>
          {/* email input field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                id="email"
                type="email"
                value={lead.email}
                onChange={(e) =>
                  setLead({
                    ...lead,
                    email: e.target.value,
                  })
                }
                className="pl-10 w-full p-3 bg-gray-50 border border-gray-200 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A1BE0] focus:border-transparent"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>
          {/* company field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Company
            </label>

            <div className="relative w-full flex flex-col gap-2">
              <div className="flex relative flex-row items-center justify-between text-base w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A1BE0] focus:border-transparent">
                <input
                  type="text"
                  className="w-11/12 border-0 p-0 focus:outline-none focus:ring-0 focus:border-0 text-sm text-black"
                  placeholder="eg. Amazon"
                  value={lead.company_name}
                  onChange={(e) => {
                    const value = e.target.value;
                    setLead({
                      ...lead,
                      company_name: value,
                      company_id: null,
                    });
                    if (value.length) {
                      setFilteredCompanies(
                        companies?.filter((company) => company.name.toLowerCase().includes(value.toLowerCase())) ?? []
                      );
                    }
                  }}
                  onFocus={() => setCompanyDropdown(true)}
                />
                <ChevronDown
                  className="text-[#363430] absolute top-3 right-2.5 w-6 h-6"
                  onClick={() => setCompanyDropdown(true)}
                />
              </div>

              {companyDropdown && (
                <div
                  className="top-10 absolute z-10 mt-2 bg-white rounded-md shadow-md w-full max-h-56 overflow-y-auto no-scrollbar"
                  ref={companyDropdownRef}>
                  {filteredCompanies?.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2 hover:bg-gray-100 cursor-pointer inter font-light text-sm leading-[150%] tracking-[5%] text-black"
                      onClick={() => {
                        setLead({
                          ...lead,
                          company_id: item.id,
                          company_name: item.name,
                        });
                        setCompanyDropdown(false);
                      }}>
                      {item.name}
                    </div>
                  ))}
                  <div
                    className="p-2 hover:bg-gray-100 cursor-pointer inter font-light text-sm leading-[150%] tracking-[5%] text-black"
                    onClick={() => {
                      setLead({
                        ...lead,
                        company_id: null,
                      });
                      setCompanyDropdown(false);
                    }}>
                    + Add "{lead.company_name}"
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* last contacted at input field */}
          <div className="space-y-2">
            <label htmlFor="last_contacted_at" className="block text-sm font-medium text-gray-700">
              Last Contacted At
            </label>
            <DatePicker
              oneTap
              block
              value={lead.last_contacted_at ? new Date(lead.last_contacted_at) : null}
              onChange={(val) =>
                setLead({
                  ...lead,
                  last_contacted_at: val?.toISOString() ?? "",
                })
              }
            />
          </div>
          {/* engaged toggle */}
          <div className="space-y-2">
            <Toggle
              checked={lead.engaged}
              onChange={(c) =>
                setLead({
                  ...lead,
                  engaged: c,
                })
              }
              checkedChildren={<Check size={16} />}
              unCheckedChildren={<X size={16} />}>
              Engaged
            </Toggle>
          </div>
          {/* choose stage */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Stage
            </label>
            <DropdownList
              value={lead.stage}
              className="w-full p-3 flex gap-2 items-center justify-between bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A1BE0] focus:border-transparent"
              items={STAGES.map((stage) => ({
                label: stage.label,
                onClick: () =>
                  setLead({
                    ...lead,
                    stage: stage.value,
                  }),
              }))}
            />
          </div>
        </div>
      </Drawer.Body>
    </Drawer>
  );
};

export default memo(AddOrEditLeadDrawer);
