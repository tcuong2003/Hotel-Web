import React, { useState } from "react"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import { DateRangePicker } from "react-date-range" //provide display select date

const DateSlider = ({ onDateChange, onFilterChange }) => {
	const [dateRange, setDateRange] = useState({ //save khoảng ngày hiện tại
		startDate: undefined, 
		endDate: undefined,
		key: "selection" //của DateRangePicker use follow select date
	})

	const handleSelect = (ranges) => { // object ranges chứa select new day
		setDateRange(ranges.selection) //update new ranges when change input
		//2 functions callback từ component cha để handle day change, show phía trên start day và end day
		onDateChange(ranges.selection.startDate, ranges.selection.endDate)
		onFilterChange(ranges.selection.startDate, ranges.selection.endDate)
	}

	const handleClearFilter = () => {
		setDateRange({
			startDate: undefined,
			endDate: undefined,
			key: "selection"
		})
		onDateChange(null, null)
		onFilterChange(null, null)
	}
	return (
		<>
			<h5>Filter bookings by date</h5>
			<DateRangePicker ranges={[dateRange]} onChange={handleSelect} className="mb-4" />
			<button className="btn btn-secondary" onClick={handleClearFilter}>
				Clear Filter
			</button>
		</>
	)
}

export default DateSlider