import { Flex, Select } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setUsers , setFilteredUser } from '../../store/reducer';

const Filters = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.user.users)
    const filterUser = useSelector(state => state.user.filterdUsers)
    const [domainFilter, setDomainFilter] = useState('')
    const [genderFilter, setGenderFilter] = useState('');
    const [availabilityFilter, setAvailabilityFilter] = useState('');
    const [localFilteredUsers, setLocalFilteredUsers] = useState([]);


    useEffect(() => {
        const filteredUsers = users?.users?.filter(user => {
            const availability = availabilityFilter === 'true' ? true : availabilityFilter === 'false' ? false : '';
            return (domainFilter === '' || user?.domain === domainFilter) &&
                (genderFilter === '' || user?.gender === genderFilter) &&
                (availabilityFilter === '' || user?.available === availability);
        });
        setLocalFilteredUsers(filteredUsers);
    }, [users, domainFilter, genderFilter, availabilityFilter]);

    // Dispatch an action to update the global state with the filtered users
    useEffect(() => {
        dispatch(setFilteredUser(localFilteredUsers));
    }, [localFilteredUsers, dispatch]);

    return (
        <div>
            <Flex gap={3} alignItems={"center"} mt={3} justifyContent={"center"} flexDirection={['column','column','row','row','row','row']}>
                <Select width={"200px"} value={domainFilter} onChange={e => setDomainFilter(e.target.value)}>
                    <option value="">Domain</option>
                    <option value="Finance">Finance</option>
                    <option value="Coder">Coder</option>
                    <option value="Sales">Sales</option>
                    <option value="IT">It</option>
                    <option value="Management">Management</option>
                    <option value="UI Designing">UI Designing</option>
                </Select>
                <Select width={"200px"} value={genderFilter} onChange={e => setGenderFilter(e.target.value)}>
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>

                </Select>
                <Select width={"200px"} value={availabilityFilter} onChange={e => setAvailabilityFilter(e.target.value)}>
                    <option value="">Available</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </Select>
            </Flex>
        </div>
    )
}

export default Filters;
