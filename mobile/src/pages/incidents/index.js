import React, { useEffect, useState } from 'react'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import logoImag from '../../assets/logo.png'
import styles from './style'
import { api } from '../../services/api'

export function Incidents() {
    const navigation = useNavigation()
    const [incidents, setIncidents] = useState([])
    const [total, setTotal] = useState()
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    useEffect(loadIncidents, [])

    function navigateToDetails(incident) {
        navigation.navigate('Details', { incident })
    }

    async function loadIncidents() {
        if (loading)
            return
        if (total > 0 && incidents.length === total)
            return

        setLoading(true)

        const response = await api.get('incidents', {
            params: { page }
        })

        setIncidents([...incidents, ...response.data])
        setTotal(response.headers['x-total-count'])
        setPage(page + 1)
        setLoading(false)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImag} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}> {total} casos </Text>
                </Text>
            </View>
            <Text style={styles.title}> Bem Vindo </Text>
            <Text style={styles.description}> Escolha um dos casos abaixo e salve o dia. </Text>

            <FlatList
                style={styles.incidentsList}
                keyExtractor={incident => incident.id}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                showsVerticalScrollIndicator={false}
                data={incidents}
                renderItem={({ item: incident }) => (

                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}> ONG</Text>
                        <Text style={styles.incidentValue} > {incident.name} </Text>

                        <Text style={styles.incidentProperty}> Caso</Text>
                        <Text style={styles.incidentValue}>  {incident.title}</Text>

                        <Text style={styles.incidentProperty}> Descriçao</Text>
                        <Text style={styles.incidentValue}>   {incident.description}</Text>

                        <Text style={styles.incidentProperty}> Valor</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(incident.value)}
                        </Text>

                        <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetails(incident)}>
                            <Text style={styles.detailsButtonText}> Ver detalhes</Text>
                            <Feather name="arrow-right" size={16} color={'#E02041'} />
                        </TouchableOpacity>
                    </View>
                )}
            />

        </View>
    )
}